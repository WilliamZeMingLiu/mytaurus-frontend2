import React from 'react';
import "./NewsFeed.css"
import {CardContent} from "semantic-ui-react";
import {Card, CardActionArea, Typography} from "@material-ui/core";

const NewsFeed = ({ url, link, title, date, content, bottomMargin }) => {
    return (
        <Card className="container" style={{ marginBottom: bottomMargin }} onClick={() => window.open(link)}>
            <CardActionArea >
                <CardContent className="cardcontainer">
                    <div id="imgcont">
                        <img src={url} alt="newsimg"/>
                    </div>
                    <div id="content">
                        <div>
                            <h4>{title}</h4>
                            <p>{date}</p>
                        </div>
                        <Typography variant="body1" color="textPrimary" style={{maxHeight: '85px', overflowY: 'auto'}}>
                            {content}
                        </Typography>
                    </div>

                </CardContent>
            </CardActionArea>
        </Card>
    );
};

NewsFeed.defaultProps = {
    bottomMargin: 16
}

export default NewsFeed;