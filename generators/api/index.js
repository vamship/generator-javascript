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
        this.log(_yosay(
            `Javascript API Generator.\n${_chalk.red(generatorTitle)} `
        ));

        this.config.set('_projectType', _consts.SUB_GEN_API);
        return _prompts.getProjectInfo(this, true)
            .then(() => { return _prompts.getAuthorInfo(this, true); })
            .then(() => { return _prompts.getDockerInfo(this, true); });
    }

    /**
     * Creates project files
     */
    createProjectFiles() {
        [
            'Dockerfile',
            'package.json',
            'Gruntfile.js',
            'README.md',
            '_gitignore',
            '_eslintrc.json',
            '_npmignore',
            '_projections.json',
            '_prettierrc',

            'src/index.js',
            'src/handlers/greeting-handler.js',
            'src/routes/index.js',
            'src/routes/greeting/index.js',
            'src/routes/greeting/route-definitions.js',
            'src/routes/health/index.js',
            'src/routes/health/route-definitions.js',
            'src/routes/test/index.js',

            'test/utils/api-utils.js',
            'test/api/core-routes.js',
            'test/api/greeting-routes.js',
            'test/api/health-routes.js',

            'test/unit/handlers/greeting-handler-spec.js',

            'docs/index.md',
            'logs/_keep'
        ].forEach((srcFile) => {
            const destFile = (srcFile.indexOf('_') === 0) ?
                                        srcFile.replace('_', '.'): srcFile;
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
    }

    /**
     * Display completed message with future actions.
     */
    finish() {
        const grunt = _chalk.green('grunt');
        const gruntTestCommand = _chalk.yellow('test');
        const gruntMonitorUnitCommand = _chalk.yellow('monitor:unit');
        const gruntMonitorServerCommand = _chalk.yellow('monitor:server');
        const gruntFormatCommand = _chalk.yellow('format');
        const gruntLintCommand = _chalk.yellow('lint');
        const gruntHelpCommand = _chalk.yellow('help');
        const gruntDocsCommand = _chalk.yellow('docs');
        const gruntPackageCommand = _chalk.yellow('package');

        this.log(_consts.SEPARATOR);
        [
            `                                                                                `,
            `--------------------------------------------------------------------------------`,
            ` Your Javascript API project has been created, and is ready for use. Grunt tasks`,
            ` have been provided for common development tasks such as:                       `,
            `                                                                                `,
            ` Running all unit tests:                                                        `,
            `   ${grunt} ${gruntTestCommand}                                                 `,
            `                                                                                `,
            ` Test driven development:                                                       `,
            `   ${grunt} ${gruntMonitorUnitCommand}                                          `,
            `                                                                                `,
            ` Run a local server that restarts on changes:                                   `,
            `   ${grunt} ${gruntMonitorServerCommand}                                        `,
            `                                                                                `,
            ` Formatting and linting files:                                                  `,
            `   ${grunt} ${gruntFormatCommand}                                               `,
            `   ${grunt} ${gruntLintCommand}                                                 `,
            `                                                                                `,
            ` Generating documentation:                                                      `,
            `   ${grunt} ${gruntDocsCommand}                                                 `,
            `                                                                                `,
            ` Packaging the API server in a Docker container:                                `,
            `   ${grunt} ${gruntPackageCommand}                                              `,
            `                                                                                `,
            ` Several other useful tasks have been packaged up with the Gruntfile. You can   `,
            ` review them all by running:                                                    `,
            `   ${grunt} ${gruntHelpCommand}                                                 `,
            `                                                                                `,
            `--------------------------------------------------------------------------------`,
            `                                                                                `
        ].forEach(line => this.log(line));
    }
};
