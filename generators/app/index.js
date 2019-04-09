'use strict';
const Generator = require('yeoman-generator');
const _chalk = require('chalk');
const _yosay = require('yosay');

const _consts = require('../../utils/constants');
const _package = require('../../package.json');

module.exports = class extends Generator {
    /**
     * Gather basic project information.
     */
    gatherProjectInfo() {
        const generatorTitle = `${_consts.GENERATOR_NAME} v${_package.version}`;
        this.log(
            _yosay(
                `Javascript Project Generators.\n${_chalk.red(generatorTitle)} `
            )
        );
        this.prompt([
            {
                type: 'list',
                name: 'templateType',
                message: 'What type of project do you want to create?',
                choices: [
                    _consts.SUB_GEN_API,
                    _consts.SUB_GEN_LIB,
                    _consts.SUB_GEN_CLI,
                    _consts.SUB_GEN_WEB
                ],
                default: 'library'
            }
        ]).then((answers) => {
            this.log(answers.templateType);
            switch (answers.templateType) {
                case _consts.SUB_GEN_API:
                    this.composeWith(
                        `${_consts.GENERATOR_NAME}:${_consts.SUB_GEN_API}`
                    );
                    break;
                case _consts.SUB_GEN_LIB:
                    this.composeWith(
                        `${_consts.GENERATOR_NAME}:${_consts.SUB_GEN_LIB}`
                    );
                    break;
                case _consts.SUB_GEN_CLI:
                    this.composeWith(
                        `${_consts.GENERATOR_NAME}:${_consts.SUB_GEN_CLI}`
                    );
                    break;
                case _consts.SUB_GEN_WEB:
                    this.composeWith(
                        `${_consts.GENERATOR_NAME}:${_consts.SUB_GEN_WEB}`
                    );
                    break;
            }
        });
    }
};
