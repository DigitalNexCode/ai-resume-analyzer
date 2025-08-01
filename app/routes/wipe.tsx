import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import Navbar from "../components/Navbar";

const WipeApp = () => {
    const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDeleteFile = async (filePath: string) => {
        await fs.delete(filePath);
        loadFiles();
    };

    const handleWipeAll = async () => {
        files.forEach(async (file) => {
            await fs.delete(file.path);
        });
        await kv.flush();
        loadFiles();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error {error}</div>;
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-b from-blue-50 to-white py-12">
            <div className="bg-white rounded-2xl shadow-lg w-fit min-w-[320px] max-w-full px-4 sm:px-8 py-6 sm:py-8 flex flex-col gap-6 overflow-x-auto">
                <div className="flex flex-row items-center gap-4 mb-2">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a2 2 0 012 2v2H7V5a2 2 0 012-2zm-2 6h8" /></svg>
                    <h1 className="text-3xl font-bold text-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Wipe App Data</h1>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <span className="text-gray-500 text-base">Authenticated as: <span className="font-semibold text-blue-600">{auth.user?.username}</span></span>
                    <button
                        className="primary-button px-5 py-2 text-base font-semibold"
                        onClick={async () => {
                            if (window.confirm('Are you sure you want to delete ALL files and wipe app data? This cannot be undone.')) {
                                await handleWipeAll();
                            }
                        }}
                    >
                        <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a2 2 0 012 2v2H7V5a2 2 0 012-2zm-2 6h8" /></svg>
                        Wipe All
                    </button>
                </div>
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">Existing Files</h2>
                    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                        <table className="min-w-full bg-white rounded-xl">
                            <thead>
                                <tr className="bg-gradient-to-r from-blue-50 to-purple-50">
                                    <th className="py-3 px-4 text-left text-gray-700 font-medium">Name</th>
                                    <th className="py-3 px-4 text-left text-gray-500 font-medium">Path</th>
                                    <th className="py-3 px-4 text-center font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {files.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="text-center py-8 text-gray-400 text-lg">
                                            <img src="/images/empty-folder.svg" alt="No files" className="mx-auto mb-2 w-16 h-16 opacity-60" />
                                            No files found. Your app is clean!
                                        </td>
                                    </tr>
                                ) : (
                                    files.map((file) => (
                                        <tr key={file.id} className="transition hover:bg-blue-50 group">
                                            <td className="py-3 px-4 border-b font-mono text-gray-800">{file.name}</td>
                                            <td className="py-3 px-4 border-b text-xs text-gray-400 font-mono">{file.path}</td>
                                            <td className="py-3 px-4 border-b text-center">
                                                <button
                                                    title="Delete file"
                                                    onClick={() => {
                                                        if (window.confirm(`Delete file '${file.name}'?`)) handleDeleteFile(file.path);
                                                    }}
                                                    className="rounded-full p-2 bg-red-50 hover:bg-red-100 transition group-hover:scale-110 shadow-sm"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-red-500">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default WipeApp;
