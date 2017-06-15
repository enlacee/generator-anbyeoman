'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

/**
* class base
*/
class MyBase extends Generator {

    addModel(flag) {
        if (flag === true) {
          var strFileName = this.props.modelName;
          this.fs.copyTpl(
            this.templatePath('modules/TablaModel.php'),
            this.destinationPath( strFileName.charAt(0).toUpperCase() + strFileName.slice(1) + 'Model.php'), {
              name: this.props.modelName
            }
          );
          console.log("ADD MODEL!!!");
        }
    }
}

/**
 * Init module
 */
module.exports = class extends MyBase {

  constructor(args, opts) {
    super(args, opts);

    // this make appname arequired argument
    this.argument('appname', {type: String, required: false, default: 'pepe'});
    this.argument('applastname', {type: String, required: false, default: 'rios'});

    //this.argument('model', {type: Boolean, required: false, default: false, hide: true});
    // and you can then access it later;
    this.log("Log: this.options.appname = " + this.options.appname);
    this.log("Log: this.options.applastname = " + this.options.applastname);

    // this method adds support for a '--model' flag
    this.option('model');
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the classy ' + chalk.red('generator-anbyeoman') + ' generator!'
    ));

    const prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }];

    if (this.options.model === true) {
        prompts.push({
          type: 'input',
          name: 'modelName',
          message: 'Nombre de la tabla',
          default: 'tabla'
        });
    }

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );

    // add
    this.addModel(this.options.model);
  }

  // no install packages
  /*install() {
    this.installDependencies();
  }*/
};
