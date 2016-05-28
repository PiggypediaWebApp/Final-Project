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

##### Web server :
Users input text into textarea and they have to type “/n” at the end of each sentence. The textarea is limited at 200 words. When users finish typing, click the button below the textarea. Once the button is clicked, the text paragraph is splitted into sentences by using /n as a mark. The splitted sentences are collected in array. Then posting SOAP request to server with the array as a body and get the response from the server. After that, highlight sentences that copied from Wikipedia.

##### Application Server :
- API-Server
    - Implement it with node.js 
    - When received POST Request from web server, it will execute the command in terminal
    - Create the input file from the request to be one sentence per line
    - Run PIG Latin
    - Store the output from mapreduce in the output file
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


## Problems
- Condition and process of split text into sentences is complicated. So, we can’t implement auto split sentence in time and let the user mark the end of sentence instead.



