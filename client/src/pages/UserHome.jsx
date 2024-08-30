function UserHome() {
    return (
        <div className="h-screen bg-gray-100">
            <header className="flex justify-between px-4 py-4 bg-white shadow-md">
                <h1 className="text-xl font-bold text-gray-800">Welcome {'User'}! </h1>
                <div className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
                    Logout
                </div>
            </header>
            <main>
                <div>
                    <p>
                        Task Allocation
                    </p>
                </div>
            </main>
        </div>
    );
}

export default UserHome;