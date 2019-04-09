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
            `Javascript Web Project Generator.\n${_chalk.red(generatorTitle)} `
        ));

        this.config.set('_projectType', _consts.SUB_GEN_API);
        return _prompts.getProjectInfo(this, true)
            .then(() => { return _prompts.getAuthorInfo(this, true); });
    }

    /**
     * Creates project files
     */
    createProjectFiles() {
        [
            'package.json',
            'README.md',
            'LICENSE',
            '_gitignore',
            '_eslintrc.json',
            '_prettierrc',

            'public/index.html',
            'public/favicon.ico',
            'public/manifest.json',

            'src/index.js',

            'src/css/app.scss',

            'src/img/logo.svg',

            'src/js/serviceWorker.js',
            'src/js/components/app.jsx',

            'src/js/utils/logger.js'

        ].forEach((srcFile) => {
            const destFile = (srcFile.indexOf('_') === 0) ?
                                        srcFile.replace('_', '.'): srcFile;
            this.fs.copyTpl(
                this.templatePath(srcFile),
                this.destinationPath(destFile),
                this.props
            );
        });
    }

    /**
     * Display completed message with future actions.
     */
    finish() {
        const npm = _chalk.green('npm');
        const cleanCommand = _chalk.yellow('run clean');
        const lintCommand = _chalk.yellow('run lint');
        const formatCommand = _chalk.yellow('run format');

        this.log(_consts.SEPARATOR);
        [
            `                                                                                `,
            `--------------------------------------------------------------------------------`,
            ` Your web project has been created, and is ready for use. Most of the           `,
            ` development tooling is provided by create-react-app                            `,
            ` (https://github.com/facebook/create-react-app). Additionally, some tasks are   `,
            ` available as npm run scripts:                                                  `,
            `                                                                                `,
            ` Removing all temporary files/artifacts:                                        `,
            `   ${npm} ${cleanCommand}                                                       `,
            `                                                                                `,
            ` Formatting and linting files:                                                  `,
            `   ${npm} ${lintCommand}                                                        `,
            `   ${npm} ${formatCommand}                                                      `,
            `                                                                                `,
            `--------------------------------------------------------------------------------`,
            `                                                                                `
        ].forEach(line => this.log(line));
    }
};
