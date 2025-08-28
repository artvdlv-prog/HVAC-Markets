#!/bin/bash

# This script updates all subpages with the unified logo styles

update_file() {
    local file=$1
    echo "Updating $file..."
    
    # First, update the CSS styles for nav-logo
    sed -i '/\.nav-logo {/,/}/c\
        .nav-logo {\
            display: flex;\
            flex-direction: column;\
            align-items: flex-start;\
            cursor: default;\
        }\
\
        .logo-main {\
            display: flex;\
            align-items: center;\
            gap: 0.3rem;\
        }\
\
        .hvac-letters {\
            display: flex;\
            gap: 0.05rem;\
            align-items: center;\
        }\
\
        .hvac-letter {\
            font-size: 1.5rem;\
            font-weight: 900;\
            color: var(--deep-graphite);\
            letter-spacing: 0;\
            cursor: pointer;\
            transition: all 0.3s ease;\
            padding: 0.2rem 0.1rem;\
            border-radius: 4px;\
            position: relative;\
            margin: 0;\
            z-index: 10;\
            pointer-events: auto;\
        }\
\
        .markets-text {\
            font-size: 1.5rem;\
            font-weight: 900;\
            color: var(--deep-graphite);\
            letter-spacing: 0.1em;\
        }\
\
        /* Heating platform styles */\
        .hvac-letter[data-platform="heating"]:hover {\
            background: rgba(255, 107, 53, 0.15);\
            color: #FF6B35;\
        }\
\
        /* Ventilation platform styles */\
        .hvac-letter[data-platform="ventilation"]:hover {\
            background: rgba(76, 175, 80, 0.15);\
            color: #4CAF50;\
        }\
\
        /* Air Conditioning platform styles (default) */\
        .hvac-letter[data-platform="airconditioning"] {\
            background: rgba(20, 100, 244, 0.15);\
            color: var(--signature-blue);\
        }\
\
        .hvac-letter[data-platform="airconditioning"]:hover {\
            background: rgba(20, 100, 244, 0.25);\
            color: var(--signature-blue);\
        }' "$file"
}

# Update air-conditioning subpages (excluding sales.html which is already done)
for file in air-conditioning/design.html air-conditioning/service.html air-conditioning/forecast.html air-conditioning/installation.html; do
    update_file "$file"
done

# Update heating subpages  
for file in heating/design.html heating/service.html heating/forecast.html heating/installation.html heating/sales.html; do
    update_file "$file"
done

# Update ventilation subpages
for file in ventilation/design.html ventilation/service.html ventilation/forecast.html ventilation/installation.html ventilation/sales.html; do
    update_file "$file"
done

echo "CSS styles updated!"