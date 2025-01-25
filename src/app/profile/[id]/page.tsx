export default function UserProfile({params}:any) {
    return (
        <>
        <div className="min-h-screen flex justify-center items-center text-white text-3xl">
            <h1>Profile</h1>
            <br />
            <p>Profile Page 
                <span className="p-5 text-4xl bg-orange-400">{params.id}</span>
            </p>
        </div>
        </>
    )
}