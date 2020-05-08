'use strict';
const Generator = require('yeoman-generator');
const _chalk = require('chalk');
const _yosay = require('yosay');

const _prompts = require('../../utils/prompts');
const _consts = require('../../utils/constants');
const _package = require('../../package.json');

module.exports = class extends Generator {
    /**
     * Gather basic project information.
     */
    gatherProjectInfo() {
        const generatorTitle = `${_consts.GENERATOR_NAME} v${_package.version}`;
        this.log(
            _yosay(`Javascript CLI Generator.\n${_chalk.red(generatorTitle)} `)
        );

        this.config.set('_projectType', _consts.SUB_GEN_CLI);
        return _prompts
            .getProjectInfo(this, true)
            .then(() => {
                return _prompts.getAuthorInfo(this, true);
            })
            .then(() => {
                return _prompts.getDockerInfo(this, true);
            });
    }

    /**
     * Creates project files
     */
    createProjectFiles() {
        [
            'Dockerfile',
            'package.json',
            'Gulpfile.js',
            'README.md',
            'LICENSE',
            '_gitignore',
            '_projections.json',
            '_eslintrc.js',
            '_prettierrc',
            '_env',

            'src/commands/greet.js',
            'test/unit/commands/greet-spec.js',

            'docs/index.md'
        ].forEach((srcFile) => {
            const tokens = srcFile.split('/');

            // Replace leading _ with . in the file name
            const fileName = tokens[tokens.length - 1];
            if (fileName.indexOf('_') === 0) {
                tokens[tokens.length - 1] = fileName.replace('_', '.');
            }

            const destFile = tokens.join('/');
            this.fs.copyTpl(
                this.templatePath(srcFile),
                this.destinationPath(destFile),
                this.props
            );
        });

        this.fs.copyTpl(
            this.templatePath('bin/main.js'),
            this.destinationPath(`bin/${this.props.projectName}.js`),
            this.props
        );
    }

    /**
     * Display completed message with future actions.
     */
    finish() {
        const buildTool = _chalk.green('gulp');
        const testCommand = _chalk.yellow('test-unit');
        const testOnChangeCommand = _chalk.yellow('watch-test-unit');
        const watchTestCommand = _chalk.yellow('monitor:unit');
        const formatCommand = _chalk.yellow('format');
        const lintCommand = _chalk.yellow('lint');
        const tasksCommand = _chalk.yellow('--tasks');
        const docsCommand = _chalk.yellow('docs');

        this.log(_consts.SEPARATOR);
        [
            `                                                                                `,
            `--------------------------------------------------------------------------------`,
            ` Your Javascript libary project has been created, and is ready for use. Gulp`,
            ` tasks have been provided for common development tasks such as:`,
            ``,
            ` Running all unit tests:`,
            `   ${buildTool} ${testCommand}`,
            ` Test files on change:`,
            `   ${buildTool} ${testOnChangeCommand}`,
            ``,
            ` Formatting and linting files:`,
            `   ${buildTool} ${formatCommand}`,
            `   ${buildTool} ${lintCommand}`,
            ``,
            ` Several other useful tasks have been packaged up with the Gulpfile. You can`,
            ` review them all by running:`,
            `   ${buildTool} ${tasksCommand}`,
            ``,
            `--------------------------------------------------------------------------------`,
            ``
        ].forEach((line) => this.log(line));
    }
};
