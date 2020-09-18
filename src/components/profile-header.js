import React from 'react';

function ProfileHeader() {
    return (
       <>

        <div className="flex-containerProfile">

            <div className="profileTitle">
                <p>Dit is jouw profiel</p>
            </div>
        </div>

           <div className="upperText">
               <p>Locatie ontdekt? Upload hier een foto</p>
           </div>


            <div>
                <input className="ProfileFile" type="file"/>
            </div>

        </>

    );
}

export default ProfileHeader ;
