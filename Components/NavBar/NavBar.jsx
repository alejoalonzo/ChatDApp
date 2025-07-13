import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

//INTERNAL IMPORTS
import { ChatAppContext } from "@/Context/ChatAppContext";
import { Model, Error, Tooltip, ConnectWalletButton } from "../index"
import { MENU_ITEMS } from "@/Context/Constants";


const NavBar = () => {

    //USE STATE
    const [active, setActive] = useState(-1); // -1 significa que ningún item del menú está activo (home)
    const [open, setOpen] = useState(false);
    const [openModel, setOpenModel] = useState(false);

    const { account, userName } = useContext(ChatAppContext);

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
                            className={`flex items-center ${open ? 'space-x-3' : 'justify-center'} hover:opacity-80 transition-opacity cursor-pointer`}
                            onClick={() => setActive(-1)}
                        >
                            <div className="w-8 h-8 bg-[#FFBF00] rounded-lg flex items-center justify-center">
                                <span className="text-[#2e353d] font-bold text-sm">W3</span>
                            </div>
                            {open && (
                                <span className="text-white font-semibold text-lg">Chat Dapp</span>
                            )}
                        </Link>
                        
                        {/* Toggle Button */}
                        <button
                            onClick={() => setOpen(!open)}
                            className="p-2 rounded-lg hover:bg-[#454b57] transition-colors cursor-pointer"
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
                    {MENU_ITEMS.map(({ href, label, icon: Icon }, index) => (
                        <Link
                        key={href}             // mejor que usar el índice
                        href={href}
                        onClick={() => setActive(index)}
                        className={`
                            flex items-center px-4 py-3 mx-2 rounded-lg transition-all
                            ${active === index
                            ? "bg-[#FFBF00] text-[#2e353d]"
                            : "text-white hover:bg-[#454b57]"}
                            ${open ? "justify-start space-x-3" : "justify-center"}
                        `}
                        >
                        {/* Icono importado dinámicamente */}
                        <Icon className="w-5 h-5 flex-shrink-0" />

                        {/* Etiqueta solo si el sidebar está abierto */}
                        {open && <span className="text-sm font-medium">{label}</span>}
                        </Link>
                    ))}
                </div>

                {/* User Section */}
                <div className="p-4 border-t border-[#454b57]">
                    {/* Connect Wallet Button - Solo cuando está expandido */}
                    {open && (
                        <ConnectWalletButton variant="desktop" />
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
                        className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer"
                        onClick={() => setActive(-1)}
                    >
                        <div className="w-8 h-8 bg-[#FFBF00] rounded-lg flex items-center justify-center">
                            <span className="text-[#2e353d] font-bold text-sm">W3</span>
                        </div>
                        <span className="text-white font-semibold text-lg">Chat Dapp</span>
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
                                <Link 
                                    href="/"
                                    className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer"
                                    onClick={() => {
                                        setActive(-1);
                                        setOpenModel(false);
                                    }}
                                >
                                    <div className="w-8 h-8 bg-[#FFBF00] rounded-lg flex items-center justify-center">
                                        <span className="text-[#2e353d] font-bold text-sm">W3</span>
                                    </div>
                                    <span className="text-white font-semibold text-lg">ChatApp</span>
                                </Link>
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
                            {MENU_ITEMS.map(({ href, label, icon: Icon }, index) => (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={() => {
                                    setActive(index);
                                    setOpenModel(false);
                                    }}
                                    className={`
                                    flex items-center px-4 py-3 mx-2 rounded-lg space-x-3 transition-all
                                    ${active === index
                                        ? "bg-[#FFBF00] text-[#2e353d]"
                                        : "text-white hover:bg-[#454b57]"}
                                    `}
                                >
                                    <Icon className="w-5 h-5 flex-shrink-0" />
                                    <span className="text-sm font-medium">{label}</span>
                                </Link>
                            ))}

                        </div>

                        {/* User Section Mobile */}
                        <div className="p-4 border-t border-[#454b57]">
                            {/* Connect Wallet Button */}
                            <ConnectWalletButton variant="mobile" onClose={() => setOpenModel(false)} />
                            
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
