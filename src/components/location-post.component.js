import React, {useEffect, useState} from 'react';
import Profilepicture from "./profilepic.png";
import axios from "axios";
import authHeader from "../services/auth-header";
import {render} from "react-dom";



const LocationPost = (props) => {

    const [posts, setPosts] = useState([]);
    const[error, setError] = useState();

    useEffect(() =>
    {
        loadData();
    }, []);

    const loadData = async () => {
        try{
            const result = await axios.get("http://localhost:8080/api/test/get-post");
            setPosts(result.data);
            // console.log(result.data)

        } catch (error) {
            setError(error);
        }
    };

    return (


        <>
            {posts.length > 0 && posts.reverse().map((post) => {
                return (
                    <div key={post.postId} className="card">
                        {/*<p>{post.lat} {post.lng}</p>*/}
                        <p> <strong> Locatie: #23{post.postId}</strong> </p>
                        <p className="locatie-omschrijving">{post.locatieOmschrijving}</p>
                        <img className="picturePost" src={post.locatieFoto} alt="Locatie Foto" />

                        <p className="info-tekst">{post.locatieInfo}</p>

                        <div className="miniprofile">
                        <img src={Profilepicture} alt="image" className="avatar-profile"/>
                        <p className="ondertitel-post">gepost door <strong>{post.originalPoster.username}</strong></p>
                        </div>
                    </div>);
            })}
            </>

        // <div className="card">
        //     {/**Foto klikbaar-> als klik op foto -> dan ga naar locatie op de kaart**/}
        //
        //     {/*{post !== null &&*/}
        //     {/*<img src={post} alt="hoi"/>*/}
        //     {/*}*/}
        //
        //     <div>
        //         <p>{post.locatieInfo}<p>
        //             <img src={post.locatieFoto} alt="Locatie Foto" />
        //     </div>
        //
        //
        //
        //
        //     <img className="picturePost" src={postPic} alt="Picture"/>
        //     <p></p>
        //     <p>Deze hotdog-foodtruck staat op de hoek van de haringstraat, ze hebben ook fantastische sauzen🤩</p>
        //     <p>Gepost door <strong>theOriginalRonBrandsteder</strong></p>
        // </div>

    );

}

export default LocationPost;

