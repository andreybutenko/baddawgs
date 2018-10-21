# DubHacks 2018 Project
## Team members: 
Kairsten Fay, Andrey Butenko, Caleb Kierum

### Motivation:
The UW Campus Police Department (UWPD) has a public-facing website that contains [crime 
data from the past 60 days](http://police.uw.edu/crimedata/60daylog/). However, the 
data are contained within an embedded
PDF on the web page, making them largely inaccessible to interpretation. Our goal
was to scrape the embedded PDF and visualize the crime data in a user-friendly way.

### How to use: 

### Known issues: 
* If the URL of the downloadable PDF changes, the python script will break. For better
stability, it would be preferable to scrape the HTML of the web page for a PDF
link and extract the URL instead of hard-coding it in. 
* Some pages of the PDF result in a complete bad parse where all of the data ends up
in one cell. Because these data are too difficult to parse, they are dropped. In the
future, with the participation of the UWPD, we would seek a data-friendlier solution
to sharing such as a link to a CSV.  
* 'Harrassment' category is not showing up correctly. It probably is contained inside of 'Other'.
* Unrepresented category labels in the donut chart are not removed when the filters are applied.
