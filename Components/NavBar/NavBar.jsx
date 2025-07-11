import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

//INTERNAL IMPORTS
import { ChatAppContext } from "@/Context/ChatAppContext";
import { Model, Error } from "../index"


const NavBar = () => {

    const menuItems = [
        { menu: "All Users", link: "/" },
        { menu: "Chat", link: "/chat" },
        { menu: "Contact", link: "/contact" },
        { menu: "Settings", link: "/settings" },
        { menu: "FAQ", link: "/faq" },
        { menu: "Terms of Service", link: "/terms" },
        { menu: "Logout", link: "/logout" },
    ];

    //USE STATE
    const [active, setActive] = useState(0); // Cambiado de 2 a 0 para "All Users" por defecto
    const [open, setOpen] = useState(false);
    const [openModel, setOpenModel] = useState(false);

    const { account, userName, connectWallet } = useContext(ChatAppContext);

    return (
        <>
            {/* Sidebar Navigation - Solo visible en tablet y desktop */}
            <nav 
                className={`
                    hidden sm:flex
                    ${open ? 'w-64' : 'w-16'}
                    bg-[#2e353d]
                    transition-all duration-300 ease-in-out
                    flex-col
                    border-r border-[#454b57]
                    rounded-l-[2rem]
                `}
                style={{ height: '100%' }}
            >
                {/* Header del sidebar */}
                <div className="p-4 border-b border-[#454b57]">
                    <div className={`flex items-center ${open ? 'justify-between' : 'flex-col space-y-3'}`}>
                        {/* Logo/Brand - Clicable */}
                        <Link 
                            href="/"
                            className={`flex items-center ${open ? 'space-x-3' : 'justify-center'} hover:opacity-80 transition-opacity`}
                            onClick={() => setActive(0)}
                        >
                            <div className="w-8 h-8 bg-[#FFBF00] rounded-lg flex items-center justify-center">
                                <span className="text-[#2e353d] font-bold text-sm">W3</span>
                            </div>
                            {open && (
                                <span className="text-white font-semibold text-lg">ChatApp</span>
                            )}
                        </Link>
                        
                        {/* Toggle Button */}
                        <button
                            onClick={() => setOpen(!open)}
                            className="p-2 rounded-lg hover:bg-[#454b57] transition-colors"
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {open ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="flex-1 py-4 overflow-y-auto">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.link}
                            className={`
                                flex items-center px-4 py-3 mx-2 rounded-lg
                                transition-all duration-200
                                ${active === index 
                                    ? 'bg-[#FFBF00] text-[#2e353d]' 
                                    : 'text-white hover:bg-[#454b57]'
                                }
                                ${open ? 'justify-start space-x-3' : 'justify-center'}
                            `}
                            onClick={() => setActive(index)}
                        >
                            {/* Iconos para cada menu item */}
                            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                {/* ...existing code for icons... */}
                                {index === 0 && (
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                    </svg>
                                )}
                                {index === 1 && (
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                )}
                                {index === 2 && (
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                )}
                                {index === 3 && (
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )}
                                {index === 4 && (
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )}
                                {index === 5 && (
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                )}
                                {index === 6 && (
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                )}
                            </div>
                            
                            {/* Texto del menu - Solo visible cuando está expandido */}
                            {open && (
                                <span className="font-medium text-sm whitespace-nowrap">
                                    {item.menu}
                                </span>
                            )}
                        </Link>
                    ))}
                </div>

                {/* User Section */}
                <div className="p-4 border-t border-[#454b57]">
                    {/* Connect Wallet Button - Primero cuando está expandido */}
                    {!account && open && (
                        <button
                            onClick={connectWallet}
                            className="w-full mb-3 px-3 py-2 rounded-lg bg-[#FFBF00] hover:bg-[#ffc000] text-[#2e353d] font-medium text-sm transition-colors"
                        >
                            Connect Wallet
                        </button>
                    )}
                    
                    <div className={`flex items-center ${open ? 'space-x-3' : 'justify-center'}`}>
                        <div className="w-8 h-8 bg-[#FFBF00] rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-[#2e353d] font-bold text-xs">
                                {userName ? userName.charAt(0).toUpperCase() : '?'}
                            </span>
                        </div>
                        {open && (
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-medium text-sm truncate">
                                    {userName || 'User'}
                                </p>
                                <p className="text-gray-400 text-xs truncate">
                                    {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'No wallet connected'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation - Solo visible en mobile */}
            <nav className="sm:hidden bg-[#2e353d] border-b border-[#454b57] px-4 py-3">
                <div className="flex items-center justify-between">
                    <Link 
                        href="/"
                        className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                        onClick={() => setActive(0)}
                    >
                        <div className="w-8 h-8 bg-[#FFBF00] rounded-lg flex items-center justify-center">
                            <span className="text-[#2e353d] font-bold text-sm">W3</span>
                        </div>
                        <span className="text-white font-semibold text-lg">ChatApp</span>
                    </Link>
                    
                    <button
                        onClick={() => setOpenModel(true)}
                        className="p-2 rounded-lg hover:bg-[#454b57] transition-colors"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Modal - Solo visible en mobile */}
            {openModel && (
                <div className="sm:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setOpenModel(false)}>
                    <div className="fixed inset-y-0 right-0 w-80 bg-[#2e353d] shadow-xl transform transition-transform duration-300 ease-in-out" onClick={(e) => e.stopPropagation()}>
                        {/* Header del modal */}
                        <div className="p-4 border-b border-[#454b57] flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-[#FFBF00] rounded-lg flex items-center justify-center">
                                    <span className="text-[#2e353d] font-bold text-sm">W3</span>
                                </div>
                                <span className="text-white font-semibold text-lg">ChatApp</span>
                            </div>
                            <button
                                onClick={() => setOpenModel(false)}
                                className="p-2 rounded-lg hover:bg-[#454b57] transition-colors"
                            >
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Menu Items */}
                        <div className="flex-1 py-4 overflow-y-auto">
                            {menuItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.link}
                                    className={`
                                        flex items-center px-4 py-3 mx-2 rounded-lg space-x-3
                                        transition-all duration-200
                                        ${active === index 
                                            ? 'bg-[#FFBF00] text-[#2e353d]' 
                                            : 'text-white hover:bg-[#454b57]'
                                        }
                                    `}
                                    onClick={() => {
                                        setActive(index);
                                        setOpenModel(false);
                                    }}
                                >
                                    {/* Iconos para cada menu item */}
                                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                        {index === 0 && (
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                            </svg>
                                        )}
                                        {index === 1 && (
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        )}
                                        {index === 2 && (
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        )}
                                        {index === 3 && (
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        )}
                                        {index === 4 && (
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )}
                                        {index === 5 && (
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        )}
                                        {index === 6 && (
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                        )}
                                    </div>
                                    
                                    <span className="font-medium text-sm">
                                        {item.menu}
                                    </span>
                                </Link>
                            ))}
                        </div>

                        {/* User Section Mobile */}
                        <div className="p-4 border-t border-[#454b57]">
                            {/* Connect Wallet Button */}
                            {!account && (
                                <button
                                    onClick={() => {
                                        connectWallet();
                                        setOpenModel(false);
                                    }}
                                    className="w-full mb-3 px-3 py-2 rounded-lg bg-[#FFBF00] hover:bg-[#ffc000] text-[#2e353d] font-medium text-sm transition-colors"
                                >
                                    Connect Wallet
                                </button>
                            )}
                            
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-[#FFBF00] rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-[#2e353d] font-bold text-xs">
                                        {userName ? userName.charAt(0).toUpperCase() : '?'}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-medium text-sm truncate">
                                        {userName || 'User'}
                                    </p>
                                    <p className="text-gray-400 text-xs truncate">
                                        {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'No wallet connected'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default NavBar;
