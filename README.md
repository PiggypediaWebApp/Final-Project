# Final-Project

## Team Members

- Tanatorn Assawaamnuey 5610545048 [naneen](https://github.com/naneen)
- Pongsachon Pornsriniyom 5610545749 [TanDooky](https://github.com/TanDooky)
- Nabhat Yuktadatta 5610546711 [momogame](https://github.com/momogame)
- Thanyaboon Tovorapan 5610546745 [chaoexit](https://github.com/chaoexit)
- Mintra Thirasirisin 5610546761 [mntrq](https://github.com/mntrq)

##### Contributions
- Thanyaboon: config load balancer
- Pongsachon: config hadoop cluster
- Tanatorn:  web server
- Mintra : api-server
- Pongsachon: PIG
- Nabhat : pre process file


## Web Application Design
![alt text](https://github.com/PiggypediaWebApp/Final-Project/blob/master/src/image/Diagram.png)


## EC2 Configuration

##### Frontend 
IP: 52.77.208.153 - Load Balance

IP: 52.77.240.157 - Web

IP: 52.77.252.2 - Web

##### Backend
IP: 52.77.244.73 - Master Node

IP: 52 221.244.226 - Slave Node (datanode)

IP: 54.169.56.235: Slave Node (datanode)


## Process flow

##### Load Balance : 
- Deploy web server(angularJS) into tomcat8 : 2 instances.
- Implementeed the server with Apache2 (HTTP-SERVER).
- Loaded mod_jk module to do a load balancing.
- Assign workers : 52.77.240.157 and 52.77.252.2 with unweighted round robin algorithm.
- Closed ports in workers and use ajp13 protocol only to redirect to workers.
- Use JkMount to redirect /piggy-pedia* to load balancer.


##### Web server :
Users input text into textarea and they have to type “/n” at the end of each sentence. The textarea is limited at 200 words. When users finish typing, click the button below the textarea. Once the button is clicked, the text paragraph is splitted into sentences by using /n as a mark. The splitted sentences are collected in array. Then posting SOAP request to server with the array as a body and get the response from the server. After that, highlight sentences that copied from Wikipedia.

##### Application Server :
- API-Server
    - Implement it with node.js 
    - When received POST Request from web server, it will execute the command in terminal
    - Create the input file from the request to be one sentence per line
    - Send input file to HDFS using webhdfs
    - Run PIG Latin by using child_process module to execute "pig search.pig"
    - Read output file from HDFS using webhdfs
    - Return the output which contain location of filename, sentence number, and text in JSON format to web server

- Map Reduce process 
    - Implement by PIG Latin
    - Load the textbook folder and store in SET1
    - Load the input file and store in SET2
    - Split each element in SET1 by ‘{_}’ and store the value in SENTENCES
    - Set the SET2 variable again and store in INPUTS
    - Join the INPUTS and SENTENCES with the same text and store in JOINSET
    - Select only wanted value from each JOINSET and store in JOINCLEAN
    - Write the result in my_search_pig_out
    - ***All loaded data must store in HDFS also the destination of written data will be in HDFS.

- PIG

set1 = LOAD '/user/webapp1/example' as (line:chararray);
set2 = LOAD '/user/webapp1/input.txt' AS (inText:chararray);

sentences = FOREACH set1 GENERATE FLATTEN(STRSPLIT(line, '\\u007B\\u005F\\u007D')) AS (file:chararray, num:chararray, text:chararray);
inputs = FOREACH set2 GENERATE inText AS inText;

joinSet = JOIN inputs BY inText, sentences BY text;
joinClean = FOREACH joinSet GENERATE file, num, text;

store joinClean into '/user/webapp1/outupt/my_search_pig_out';



## Problems
- Condition and process of split text into sentences is complicated. So, we can’t implement auto split sentence in time and let the user mark the end of sentence instead.
- Hadoop cluster can't finish pig job due to memory problem in JVM. But can finish WorkCount example an SecondLink from homework5 without any problem. 


