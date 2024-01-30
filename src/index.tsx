import React, { useState } from 'react'
import { Editor } from 'slate'
import { useSlate } from 'slate-react'

import { useOutsideClick } from './useOutsideClick'

import './index.scss'

type colorListItem = {
    label: string
    color: string
}

type wruTextColorLeafType = {
    name: string
    colorList: Array<colorListItem>
}

export default function wruTextColorLeaf({ name, colorList }: wruTextColorLeafType) {
    const getActiveColor = (editor: any, format: any) => {
        const leaves = Editor.marks(editor)
        // @ts-ignore
        return leaves && leaves[name] ? leaves[name] : null
    }

    const removeLeaf = (editor: any, format: any) => {
        Editor.removeMark(editor, format)
    }

    const addLeaf = (editor: any, format: any, color: string) => {
        Editor.addMark(editor, format, color)
    }

    type ColorSelectType = {
        editor: any
        format: any
        currentColor: string | null
    }

    const ColorSelect: React.FC<ColorSelectType> = props => {
        const { editor, format, currentColor } = props
        const [isOpen, setIsOpen] = useState(false)

        const color = currentColor ? currentColor : '#000'

        const ref = useOutsideClick(() => {
            setIsOpen(false)
        })

        return (
            <div className="wru-color-picker rich-text__button" ref={ref}>
                <label
                    onMouseDown={event => {
                        event.preventDefault()
                        setIsOpen(!isOpen)
                    }}
                >
                    <div className="wruColorPickerColor" style={{ backgroundColor: color }}></div>
                </label>
                {isOpen && (
                    <div className="wruColorPickerList">
                        <ul>
                            {colorList.map(function (item, index) {
                                return (
                                    <li key={index} title={item.label}>
                                        <div
                                            className="wruColorPickerColor"
                                            style={{ backgroundColor: item.color }}
                                            onMouseDown={event => {
                                                event.preventDefault()
                                                const activeColor = getActiveColor(editor, format)
                                                if (activeColor) {
                                                    if (activeColor != item.color) {
                                                        // Remove the active color and set the new color
                                                        removeLeaf(editor, format)
                                                        addLeaf(editor, format, item.color)
                                                    } else {
                                                        // Just remove the current color
                                                        removeLeaf(editor, format)
                                                    }
                                                } else {
                                                    addLeaf(editor, format, item.color)
                                                }
                                                setIsOpen(false)
                                            }}
                                        ></div>
                                    </li>
                                )
                            })}
                            <li>
                                <div
                                    className="wruColorPickerColor wruColorPickerColorResett"
                                    onMouseDown={event => {
                                        event.preventDefault()
                                        removeLeaf(editor, format)
                                        setIsOpen(false)
                                    }}
                                ></div>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        )
    }

    const LeafButton = ({ format, children }: { format: any; children: any }) => {
        const editor = useSlate()
        const currentColor = getActiveColor(editor, format)

        return <ColorSelect editor={editor} format={format} currentColor={currentColor} />
    }

    const Button = ({ format, children }: { format: any; children: any }) => {
        return (
            <div>
                <LeafButton format={name}>{{ children }}</LeafButton>
            </div>
        )
    }

    const Leaf = ({
        attributes,
        leaf,
        children,
    }: {
        attributes: any
        leaf: any
        children: any
    }) => {
        if (leaf[name]) {
            return (
                <span
                    style={{
                        color: leaf[name],
                    }}
                    {...attributes}
                >
                    {children}
                </span>
            )
        }
        return <span {...attributes}>{children}</span>
    }

    return {
        name,
        Button,
        Leaf,
    }
}
