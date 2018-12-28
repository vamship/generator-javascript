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
            '_eslintrc.json',
            '_gitignore',
            '_npmignore',
            '_prettierrc',
            '_projections.json',
            'Dockerfile',
            'docs/index.md',
            'Gruntfile.js',
            'package.json',
            'README.md',
            'src/commands/greet.js',
            'test/unit/commands/greet-spec.js'
        ].forEach((srcFile) => {
            const destFile =
                srcFile.indexOf('_') === 0
                    ? srcFile.replace('_', '.')
                    : srcFile;
            this.fs.copyTpl(
                this.templatePath(srcFile),
                this.destinationPath(destFile),
                this.props
            );
        });

        this.fs.copyTpl(
            this.templatePath('_rc'),
            this.destinationPath(`.${this.props.projectCamelCasedName}rc`),
            this.props
        );

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
        const grunt = _chalk.green('grunt');
        const gruntTestCommand = _chalk.yellow('test');
        const gruntMonitorCommand = _chalk.yellow('monitor:unit');
        const gruntFormatCommand = _chalk.yellow('format');
        const gruntLintCommand = _chalk.yellow('lint');
        const gruntHelpCommand = _chalk.yellow('help');
        const gruntDocsCommand = _chalk.yellow('docs');

        this.log(_consts.SEPARATOR);
        [
            `                                                                                `,
            `--------------------------------------------------------------------------------`,
            ` Your Javascript CLI project has been created, and is ready for use. Grunt tasks`,
            ` have been provided for common development tasks such as:                       `,
            `                                                                                `,
            ` Running all unit tests:                                                        `,
            `   ${grunt} ${gruntTestCommand}                                                 `,
            `                                                                                `,
            ` Test driven development:                                                       `,
            `   ${grunt} ${gruntMonitorCommand}                                              `,
            `                                                                                `,
            ` Formatting and linting files:                                                  `,
            `   ${grunt} ${gruntFormatCommand}                                               `,
            `   ${grunt} ${gruntLintCommand}                                                 `,
            `                                                                                `,
            ` Generating documentation:                                                      `,
            `   ${grunt} ${gruntDocsCommand}                                                 `,
            `                                                                                `,
            ` Several other useful tasks have been packaged up with the Gruntfile. You can   `,
            ` review them all by running:                                                    `,
            `   ${grunt} ${gruntHelpCommand}                                                 `,
            `                                                                                `,
            `--------------------------------------------------------------------------------`,
            `                                                                                `
        ].forEach((line) => this.log(line));
    }
};
