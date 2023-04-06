package com.dev.awsupload.profile;

import com.dev.awsupload.datastore.FakeProfileDataStore;
import com.dev.awsupload.profile.UserProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserProfileDataAccess {
    private final FakeProfileDataStore fakeProfileDataStore;

    @Autowired
    public UserProfileDataAccess(FakeProfileDataStore fakeProfileDataStore) {
        this.fakeProfileDataStore = fakeProfileDataStore;
    }

    List<UserProfile> getUserProfiles(){
        return fakeProfileDataStore.getUSerProfiles();
    }
}
