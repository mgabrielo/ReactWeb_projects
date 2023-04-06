package com.dev.awsupload.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/userprofile")
@CrossOrigin("*")
public class ProfileController {

    @Autowired
    private final UserProfileServices userProfileServices;

    @Autowired
    public ProfileController(UserProfileServices userProfileServices) {
        this.userProfileServices = userProfileServices;
    }

    @GetMapping
    public List<UserProfile> getUsersProfile(){
        return userProfileServices.getUserProfiles();
    }
    @PostMapping(path = "{profile_id}/image/upload",
                 consumes = MediaType.MULTIPART_FORM_DATA_VALUE ,
                 produces = MediaType.APPLICATION_JSON_VALUE)
    public void uploadProfileImage(@PathVariable ("profile_id")UUID userID,
                                   @RequestParam("file")MultipartFile file){
        userProfileServices.uploadProfileImage(userID, file);
    }

    @GetMapping(path = "{profile_id}/image/download")
    public byte[] downloadProfileImage(@PathVariable ("profile_id")UUID userID){
       return userProfileServices.downloadProfileImage(userID);
    }
}
