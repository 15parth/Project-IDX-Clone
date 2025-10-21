import React from 'react'
import { IoLogoJavascript } from "react-icons/io5"
import { FaReact } from "react-icons/fa"
import { FaCss3Alt } from "react-icons/fa"
import { FaHtml5 } from "react-icons/fa"
import { BsFiletypeJson } from "react-icons/bs"
import { ImSvg } from "react-icons/im"
import { FaReadme } from "react-icons/fa6"
import { FaGitAlt } from "react-icons/fa"

const FileIcon = ({ extension }) => {
    return (
        <>
            {extension === "js" && <IoLogoJavascript color="yellow"
                style={{
                    height: "25px",
                    width: "25px"
                }}
            />}
            {
                extension === "jsx" && <FaReact color="blue"
                    style={{
                        height: "25px",
                        width: "25px"
                    }}
                />
            }
            {
                extension === "css" && <FaCss3Alt color="blue"
                    style={{
                        height: "25px",
                        width: "25px"
                    }}
                />
            }

            {
                extension === "html" && <FaHtml5 color="blue"
                    style={{
                        height: "25px",
                        width: "25px"
                    }}
                />
            }
            {
                extension === "json" && <BsFiletypeJson color="yellow"
                    style={{
                        height: "25px",
                        width: "25px"
                    }}
                />
            }
            {
                extension === "svg" && <ImSvg color="blue"
                    style={{
                        height: "25px",
                        width: "25px"
                    }}
                />
            }
            {
                extension === "md" && <FaReadme color="blue"
                    style={{
                        height: "25px",
                        width: "25px"
                    }}
                />
            }
            {
                extension === "gitignore" && <FaGitAlt color="red"
                    style={{
                        height: "25px",
                        width: "25px"
                    }}
                />
            }

        </>
    )
}

export default FileIcon
