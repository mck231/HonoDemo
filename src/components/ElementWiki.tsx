import { FC, useEffect, useState } from 'hono/jsx';

interface ElementWikiProps {
    elementName: string | null;
}

const ElementWiki: FC<ElementWikiProps> = ({ elementName }) => {
    const [wikiData, setWikiData] = useState<string | null>(null);

    useEffect(() => {
        if (elementName !== null) {
            const fetchWikiData = async () => {
                try {
                    const response = await fetch(`/api/wiki/${elementName}`);
                    const data = await response.json();

                    // Assuming the API returns structured JSON, extract the relevant part
                    const extract = data.extract ? data.extract : data; // Adapt to your API's response structure

                    // Set data safely if it's plain text; otherwise, handle formatted data.
                    setWikiData(extract);
                } catch (error) {
                    console.error('Error fetching wiki data:', error);
                    setWikiData(null);
                }
            };

            fetchWikiData();
        }
    }, [elementName]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }}>
            {wikiData ? (
                <div style={{
                    width: '500px',
                    height: '400px',
                    border: '1px solid #ccc',
                    padding: '10px',
                    borderRadius: '5px',
                    overflowY: 'auto' // Enable scrolling if content exceeds height
                }}>
                    <h3>Wikipedia Information</h3>
                    <div dangerouslySetInnerHTML={{ __html: wikiData }} />
                </div>
            ) : (
                <p>Select an element to view more info</p>
            )}
        </div>
    );
}

export default ElementWiki;