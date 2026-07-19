import download from '../../assets/download.svg'
import history from '../../assets/history.svg'
import trash from '../../assets/trash.svg'
import { useAuth } from '../../auth_context';
import { useState, useEffect } from "react";
import styles from './History.module.css'

function History(){
    const { currentUser } = useAuth();
    const [images, setImages] = useState([]);
    const fetchImages= async()=>{
        try {
            const response = await fetch(
                `https://vision-lab-r57w.onrender.com/api/image/${currentUser.uid}`,{
                    method:"GET"
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch images");
            }

            const data = await response.json();
            setImages(data);
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        if (currentUser) {
            fetchImages();
        }
    }, [currentUser]);
    const handleDeleteOne=async(publicId)=>{
        try {
            const response = await fetch(
                "https://vision-lab-r57w.onrender.com/api/image/",{
                    method:"DELETE",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        publicId: publicId
                    })

                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete image");
            }

            setImages(prev => prev.filter(img => img.publicId !== publicId));
        } catch (err) {
            console.error(err);
        }
    }
    const handleDeleteAll=async()=>{
        try {
            const response = await fetch(
                `http://localhost:3000/api/images/${currentUser.uid}`,{
                    method:"DELETE"
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete images");
            }

            setImages([]);
        } catch (err) {
            console.error(err);
        }
    }

    if (images.length === 0) {
        return null;
    }

    return(
        <section id="uploads" className="glass-panel">
            <div className="section-header">
                <h2 className="section-title">
                    <div className="icon-box blue">
                        <img src={history} className="text-neon-blue" width="20" height="20"/>
                    </div>
                    Recent Activity
                </h2>
                <button onClick={() => handleDeleteAll()}
                    style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid rgba(239, 68, 68, 0.4)',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        color: '#f87171',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}>Clear History</button>
            </div>

            <div className="grid-2">
                {images.map((image) => (
                    <div key={image._id} className="activity-card blue">
                        <div className="activity-thumb">
                            <img
                                src={image.url}
                                alt={image.originalFilename}
                            />
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                            <h4 className="font-mono text-sm text-gray-200 truncate">
                                {image.originalFilename}
                            </h4>
                        </div>

                        <a
                            href={image.url}
                            download
                            className="download-btn"
                        >
                            <img src={download} width="20" height="20" />
                        </a>
                        <a
                            onClick={() => handleDeleteOne(image.publicId)}
                            className="download-btn"
                            title="Delete"
                        >
                            <img src={trash} width="20" height="20" alt="Delete" />
                        </a>

                    </div>
                ))}
            </div>
        </section>
    )
}

export default History;