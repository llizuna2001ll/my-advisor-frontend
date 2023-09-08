import React, {useContext, useState } from 'react';
import './navrab.scss';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { DarkModeContext } from '../../context/darkModeContext';

const Navbar = () => {
    const { dispatch } = useContext(DarkModeContext);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleToggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                setIsFullScreen(true);
            });
        } else {
            document.exitFullscreen().then(() => {
                setIsFullScreen(false);
            });
        }
    };

    return (
        <div className="navbars">
            <div className="wrapper">
                <div className="search"></div>
                <div className="items">
                    <div className="item"></div>

                    <div className="item">
                        <DarkModeOutlinedIcon
                            className="icon"
                            onClick={() => dispatch({ type: 'TOGGLE' })}
                        />
                    </div>

                    <div className="item">
                        <FullscreenExitOutlinedIcon
                            className="icon"
                            onClick={handleToggleFullScreen}
                        />
                    </div>

                    <div className="item">
                        <NotificationsNoneOutlinedIcon className="icon" />
                        <div className="counter">1</div>
                    </div>

                    <div className="item">
                        <ChatBubbleOutlineOutlinedIcon className="icon" />
                        <div className="counter">2</div>
                    </div>

                    <div className="item">
                        <ListOutlinedIcon className="icon" />
                    </div>

                    <div className="item">
                        <img
                            src="https://images.pexels.com/photos/16628785/pexels-photo-16628785/free-photo-of-fashion-love-woman-dark.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt=""
                            className="avatar"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
