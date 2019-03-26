
::**********Start of script**********

set results=C:\Users\rodgersja\Desktop\CrawlAnalyzer\results\
:: %results%
:: do not add trailing slash

set sfclidir=C:\Program Files (x86)\Screaming Frog SEO Spider\
:: %sfclidir%
:: include trailing slash

set configFile=C:\Users\rodgersja\Documents\SEO Spider Config.seospiderconfig
:: %configFile%
:: ought to have .seospiderconfig file extension

set domain=https://catalogue.worldvision.ca/
:: %domain%

::create date & time stamped directory
set dateString=%DATE:/=-%
set timeString=%TIME:~0,2%-%TIME:~3,2%-%TIME:~6,2%
set ToDaysDate=%dateString%%timeString: =-%
::%ToDaysDate%

set newFilePath="%ToDaysDate%"
chdir /d %results%
mkdir %newFilePath%
chdir /d %ToDaysDate%
set outputDir=%cd%
::%outputDir%

chdir /d "%sfclidir%"
ScreamingFrogSEOSpiderCli.exe --config "%configFile%" --crawl "%domain%" --save-crawl --headless --output-folder "%outputDir%" --export-format "csv" --export-tabs "Internal:All,Response Codes:All"


chdir /d %outputDir%
REN *.csv *.
REN *. *-opensourceseo.
REN *. *.csv

::**********End of Script**********