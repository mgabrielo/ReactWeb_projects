package com.dev.awsupload.profile;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

public class UserProfile {
    private final UUID profile_id;
    private final String username;
    private String profile_img_link; //the s3 key


    public UserProfile(UUID profile_id, String username, String profile_img_link) {
        this.profile_id = profile_id;
        this.username = username;
        this.profile_img_link = profile_img_link;
    }

    public UUID getProfile_id() {
        return profile_id;
    }



    public String getUsername() {
        return username;
    }



    public Optional<String> getProfile_img_link() {
        return Optional.ofNullable( profile_img_link);
    }

    public void setProfile_img_link(String profile_img_link) {
        this.profile_img_link = profile_img_link;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserProfile that = (UserProfile) o;
        return Objects.equals( profile_id, that.profile_id) && Objects.equals(username,that.username)
                && Objects.equals(profile_img_link, that.profile_img_link);
    }

    @Override
    public int hashCode() {
        return Objects.hash(profile_id, username, profile_img_link);
    }
}
