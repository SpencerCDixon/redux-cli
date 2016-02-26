## Design Decisions

Would like to emulate the good parts of ember-cli and not use the parts I don't
like/think would work well within the React eco-system.

**Commands** will be controlled by commander.  
**Tasks** will act like rake tasks in rails.  
**Blueprints** will be what gets created via generate.  These can be overridden
by individual projects so that way projects can manage their own blueprints.  
