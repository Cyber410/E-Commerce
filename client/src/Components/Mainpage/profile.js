import React, { useEffect, useState, useContext } from "react";
import { GlobalState } from "../../global";
import styles from "./profile.module.css";

const UserProfile = () => {
    const { getUserProfile, user } = useContext(GlobalState);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (user) {
                    
                    
                    
                    const { uname, email } = user;
                    console.log("Fetching profile for:", uname);
                    const profileData = await getUserProfile(uname, email);
                    const { message, profile } = profileData;
                    setProfile(profile); 
                }
            } catch (err) {
                console.error("Failed to fetch profile:", err);
                setError("Failed to fetch profile");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchProfile();
        } else {
            setLoading(true);
        }
    }, [getUserProfile, user]);  
    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (!profile) {
        return <div className={styles.noProfile}>No profile data available</div>;
    }

    return (
        <div className={styles.userProfile}>
            <h1>User Profile</h1>
            <div className={styles.profileInfo}>
                <p><strong>ID:</strong> {profile.id}</p>
                <p><strong>Username:</strong> {profile.uname}</p>
                <p><strong>First Name:</strong> {profile.fname}</p>
                <p><strong>Last Name:</strong> {profile.lname}</p>
                <p><strong>Email:</strong> {profile.email}</p>
            </div>
        </div>
    );
};

export default UserProfile;
