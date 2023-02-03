# Intelligent Market Analysis Repository - LIX1 FYP

Website for querying the SOLR database holding financial news article and visualising insights drawn

Uses the React-Solr-Connector library to return query results from the fyp_documents SOLR database. 

**Steps to run the web app:**

1. Ensure that you have Node.js installed
2. Run the command "npm i" to install all the packages
3. Run the command "npm run start" to run the project in development mode (hot reload).
4. Go to "localhost:3000" to view the web app (assuming you have nothing else on this port) 

<ins>Search Engine Usage</ins>
Type is keywords from events (such as 'Russia' or 'Covid') to get the relevant financial documents stored in the database. 

## The following are the steps to setup SOLR
0. Need java version 8 or greator to run SOLR, hence ensure that is in install in your local machine (run command <b>java -version</b>)
1. Go to https://solr.apache.org/downloads.html to download SOLR.
2. After downloading and unzipping SOLR, go to the SOLR folder directory, run the command "start -p 8983" to start the SOLR server. 

## The following are the steps to setup and populate a SOLR core instance (the database)
1. Go to "localhost:8983/solr" to find the SOLR web server.
2. Create a SOLR core instance from the web server and assign the "instanceDir" to be the path of the "sample_techproducts_configs" on your local machine.
3. Using a HTTP post request, post the documents into this solr core instance. The command for this is as follows: 
    bin/post <core_name> <path_of_files>
4. Alternatively, files can also be uploaded onto the SOLR core from the web server directly. This can be done through the "Documents" tab, where the "File Upload" option can be selected and files can be uploaded directly from the local machine. 

## Fixing the CORS errors
The CORS error might occur when trying to make call to the solr database using the search engine. 
In order to fix this error, some added configurations need to be added to the schema files of CORS.
1. Add the following jar files into the server/solr-webapp/webapp/WEB-INF/lib directory:
    jetty-servlets-8.1.14.v20131031.jar
    jetty-util-8.1.14.v20131031.jar
2. Edit the server/solr-webapp/webapp/WEB-INF/web.xml file to include the following code:
    <filter>
    <filter-name>cross-origin</filter-name>
    <filter-class>org.eclipse.jetty.servlets.CrossOriginFilter</filter-class>
    <init-param>
        <param-name>allowedOrigins</param-name>
        <param-value>*</param-value>
    </init-param>
    <init-param>
        <param-name>allowedMethods</param-name>
        <param-value>GET,POST,OPTIONS,DELETE,PUT,HEAD</param-value>
    </init-param>
    <init-param>
        <param-name>allowedHeaders</param-name>
        <param-value>origin, content-type, accept</param-value>
    </init-param>
    </filter>

    <filter-mapping>
    <filter-name>cross-origin</filter-name>
    <url-pattern>/*</url-pattern>
    </filter-mapping>
**The above code allows the CORS server to queried from all origins**
3. Restart the SOLR core using the commmand bin/solr restart.

*Source: https://opensourceconnections.com/blog/2015/03/26/going-cross-origin-with-solr/* 
