package com.dev.awsupload.profile;

import com.dev.awsupload.bucket.BucketName;
import com.dev.awsupload.filestore.FileStore;
import org.apache.http.entity.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class UserProfileServices {

    private final UserProfileDataAccess userProfileDataAccess;

    private final FileStore fileStore;

    @Autowired
    public UserProfileServices(UserProfileDataAccess userProfileDataAccess, FileStore fileStore) {
        this.userProfileDataAccess = userProfileDataAccess;
        this.fileStore = fileStore;
    }

    List<UserProfile> getUserProfiles(){
        return userProfileDataAccess.getUserProfiles();
    }

    public byte[] downloadProfileImage(UUID userID) {
        UserProfile use = userProfileDataAccess.getUserProfiles().stream()
                .filter(userProfile -> userProfile.getProfile_id().equals(userID))
                .findFirst()
                .orElseThrow(()-> new IllegalStateException(String.format("user profile %s missing",userID)));
        String full_path = String.format("%s/%s",
                BucketName.PROFILE_IMAGE.getBucketName(),
                use.getProfile_id());
        return use.getProfile_img_link().map(key -> fileStore.download(full_path, key))
                .orElse(new byte[0]);

    }
    public void uploadProfileImage(UUID userID, MultipartFile file) {

        if(file.isEmpty()){
            throw new IllegalStateException("Can't upload empty file : ["+file.getSize()+"]");
        }

        if(!Arrays.asList(ContentType.IMAGE_JPEG.getMimeType(),ContentType.IMAGE_PNG.getMimeType(),
                        ContentType.IMAGE_GIF.getMimeType()).contains(file.getContentType())){
            throw new IllegalStateException("File Must Be Image Type");
        }

        UserProfile user = userProfileDataAccess.getUserProfiles().stream()
                .filter(userProfile -> userProfile.getProfile_id().equals(userID))
                .findFirst()
                .orElseThrow(()-> new IllegalStateException(String.format("user profile %s missing",userID)));

        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));

        String path = String.format("%s/%s" , BucketName.PROFILE_IMAGE.getBucketName(), user.getProfile_id());
        String fileName = String.format("%s-%s", file.getOriginalFilename(), UUID.randomUUID());

        try {
            fileStore.save(path, fileName, Optional.of(metadata), file.getInputStream());
            user.setProfile_img_link(fileName);
        }catch (IOException e){
            throw new IllegalStateException(e);
        }
    }


}
