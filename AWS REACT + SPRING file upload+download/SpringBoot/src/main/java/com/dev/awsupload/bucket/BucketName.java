package com.dev.awsupload.bucket;

public enum BucketName {

    PROFILE_IMAGE("dev-aws-upload-234");

    private final String bucketName;

    BucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    public String getBucketName() {
        return bucketName;
    }
}
