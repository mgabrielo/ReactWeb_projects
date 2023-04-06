package com.dev.awsupload.filestore;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.Optional;

@Service
public class FileStore {
    private final AmazonS3 amazonS3;

    @Autowired
    public FileStore(AmazonS3 amazonS3) {
        this.amazonS3 = amazonS3;
    }

    public void save(String path, String fileName, Optional<Map<String,String>> Option_metadata, InputStream input){

        ObjectMetadata metadata= new ObjectMetadata();
        Option_metadata.ifPresent(map->{
            if(!map.isEmpty()){
                map.forEach(metadata::addUserMetadata);
            }
        });
        try{
            amazonS3.putObject(path, fileName, input ,metadata);
        }catch(AmazonServiceException e){
            throw new IllegalStateException("failed to store file to amazon s3", e);
        }

    }

    public byte[] download(String path, String key) {
        try{
            S3Object object =  amazonS3.getObject(path,key);
            S3ObjectInputStream inputStream =  object.getObjectContent();
           return IOUtils.toByteArray(inputStream);
        }catch(AmazonServiceException | IOException e){
            throw new IllegalStateException("failed to store file to amazon s3", e);
        }
    }
}
