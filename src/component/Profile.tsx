import Typewriter from 'typewriter-effect';

const Profile = () => {
    return (
        <div className="text-4xl font-bold text-center mb-4">
            <Typewriter
                onInit={(typewriter) => {
                    typewriter.typeString('nama: Muhamamd Saidi, NIM: C0303023109')
                        .callFunction(() => {
                            console.log('String typed out!');
                        })
                        .pauseFor(2500)
                        .deleteAll()
                        .callFunction(() => {
                            console.log('All strings were deleted');
                        })
                        .start();
                }}
            />
        </div>
    );
};

export default Profile;
