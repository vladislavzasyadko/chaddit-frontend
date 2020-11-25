import React, { useState } from "react";
import U from "./UserSettings.module.css";
import showPass from "../../../../icons/showpass.png";

function UserSettings(props) {
    const [passView, setPassView] = useState(true);
    const { active, userName } = props;

    return (
        <>
            {active && (
                <div className={U.settings}>
                    <div style={{marginTop: '100px'}}>Почта</div>
                    <div>
                        <div className={U.userInputContainer}>
                            <input
                                className={U.userInput}
                                type={"text"}
                                placeholder={"Старый пароль"}
                            />
                        </div>
                        <button className={U.userButton}> Изменить имя </button>
                    </div>
                    <div>
                        <div className={U.userInputContainer}>
                            <input
                                className={U.userInput}
                                type={passView ? "password" : "text"}
                                placeholder={"Старый пароль"}
                            />
                            <img
                                src={showPass}
                                height={"30px"}
                                onClick={(e) => setPassView(!passView)}
                            />
                        </div>
                        <div className={U.userInputContainer}>
                            <input
                                className={U.userInput}
                                type={passView ? "password" : "text"}
                                placeholder={"Новый пароль"}
                            />
                            <img
                                src={showPass}
                                height={"30px"}
                                onClick={(e) => setPassView(!passView)}
                            />
                        </div>
                        <button className={U.userButton}>
                            Изменить пароль
                        </button>
                    </div>
                    <div>
                        <button className={U.userButton}>
                            Изменить фотографию
                        </button>
                    </div>
                    <p>Выйти из аккаунта</p>
                </div>
            )}
        </>
    );
}

export default UserSettings;
