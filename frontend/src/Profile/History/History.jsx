import download from '../../assets/download.svg'
import history from '../../assets/history.svg'
import trash from '../../assets/trash.svg'
import { useAuth } from '../../auth_context';
import { useState, useEffect } from "react";
import styles from './History.module.css'

function History(){
    const { currentUser } = useAuth();
    const [images, setImages] = useState([]);
    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/image/${currentUser.uid}`
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

        if (currentUser) {
            fetchImages();
        }
    }, [currentUser]);

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
                <button style={{
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
                            onClick={() => handleDeleteOne(image._id)}
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