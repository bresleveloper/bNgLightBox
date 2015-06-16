# bNgLightBox
a simple directive to create angular content in a light box

my focus was to make usage as simple as it can gets, so just wrap you ng-code with the directive and give it the events functions, meaning on-open, on-close, and on-save, and even the css-class for the buttons.

has 2 modes, no config for just open content, and with configuration for a full modal like workflow

for no configuration your code will look like this
    
    <parent element>
        visible content...
        <b-ng-light-box>  
          angular or html code for popup....
        </b-ng-light-box>  

for no configuration your code will look like this

    <b-ng-light-box attributes...>  
      angular or html code....
    </b-ng-light-box>  
    
see the <a target="_blank" href="http://plnkr.co/edit/AhLzw9fmBwFESNmrpC1l?p=preview">plunker</a>

i included a js file with the directive with all the html and css hardcoded for simple copy-pase, and an html file for the template, css and js seperated
