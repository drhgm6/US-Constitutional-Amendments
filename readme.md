# Amendments Visualization 
## JQuery visualization of ratification of US Constitutional Amendments

### Libraries & Resources Used
* Jquery [link](http://jquery.com)
* JQVMap [link](https://github.com/manifestinteractive/jqvmap)

### Description
Contains a visualization to view state-by-state and amendment-by-amendment voting records on US Constitutional amendments.

Users can click on any state (in the map or in the list) to view the state's ratification record, or on any amendment name to see all states' action on the amendment.

In the "amendment view", a color-coded map displays for one of six categories:
* Ratified (including date where known)
* Symbolically ratified (after the necessary 3/4 of states had already ratified), including date where known
* Took no action
* Ratified then later withdrew ratification
* Was ineligible to ratify (e.g., considered before the state had achieved statehood). 
* Rejected the amendment

Data comes from Wikipedia articles and [link](http://www.usconstitution.net/constamrat.html). Data pulled 11/14/2014 - 11/30/2014. 


### Package Contents
* **amendmentdata.js** Contains arrays of the amendment-by-amendment voting records
* **amendments.js** Contains functions for visualization and interactivity
* **amendments.html* HTML page displaying the visualization. 
* **JQuery library**
* **JQVMap library**