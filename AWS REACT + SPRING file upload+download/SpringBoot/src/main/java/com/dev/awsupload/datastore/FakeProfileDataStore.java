package com.dev.awsupload.datastore;

import com.dev.awsupload.profile.UserProfile;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Repository
public class FakeProfileDataStore {
 private static final List<UserProfile> USER_PROFILES = new ArrayList<>();

 static {
     USER_PROFILES.add(new UserProfile(UUID.fromString("80073967-ffa8-48fa-8524-00ea40263a0b"), "JANET-JACKSON", null));
     USER_PROFILES.add(new UserProfile(UUID.fromString("7fb7df02-8b4b-476b-ae92-5bcb9d62d935"), "MICHEAL-JACKSON", null));
 }


    public List<UserProfile> getUSerProfiles(){
        return USER_PROFILES;
    }
}
