## Design Decisions 1.0

Would like to emulate the good parts of ember-cli and not use the parts I don't
like/think would work well within the React eco-system.

**Commands** will be controlled by commander.  
**Tasks** will act like rake tasks in rails.  
**Blueprints** will be what gets created via generate.  These can be overridden
by individual projects so that way projects can manage their own blueprints.  

Commander will be used to spawn off top level commands.  The primary purpose of
commander will be to parse options/args and display useful help for all the
different options.  Once args have been parsed they can be passed down to
SubCommands.

## Design Decisions 2.0

Rename to blueprint-cli

Take the foundation laid by 1.0 and extend the capabilities.

Blueprints are most useful when able to be shared, copied and customized.  
The Blueprints directory discovery will be expanded to include home directories,
ENV defined directories, npm packages, config file defined.  A single 
directory may be defined as the default directory for blueprint generation. 
Provide a way to copy blueprints into the default directory in order to 
increase the ease of customizing your own version of a default or shared 
blueprint.

Enhance the .blueprintrc experience.  Add the ability to have home directory
and ENV var defined locations.  Allow merging of multiple .blueprintrc files.
Allow defining blueprint directories in the file.

Enhance the Generator experience.  Look to Ruby on Rails for inspiration.  
Look for ways to enable generator composition.  Look for ways to insert code 
into existing files.  Find ways to share and use partials in generators

Define a generator to create a npm package dir ready to share blueprints with
the community.


