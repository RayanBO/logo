import React from 'react';
import {
    AppstoreOutlined,
    BuildOutlined,
    ContainerOutlined,
    FileTextOutlined,
    HeartOutlined,
    HomeOutlined,
    ImportOutlined,
    InfoCircleOutlined,
    SettingOutlined,
    SolutionOutlined,
    TeamOutlined,
    ToolOutlined,
    AccountBookOutlined,
    UserOutlined,
} from '@ant-design/icons';

// Fonction pour obtenir les éléments du menu
export function GetItemMenu() {
    return [
        {
            key: 'acceuil',
            icon: <HomeOutlined />,
            label: 'Accueil',
        },
        {
            key: 'gest-fiche',
            icon: <UserOutlined />,
            label: 'Gestion RH',
        },
        {
            key: 'gest-service',
            icon: <ContainerOutlined />,
            label: 'Gestion des services',
            disabled: true,
        },
        {
            key: 'docs',
            label: 'Documents',
            icon: <FileTextOutlined />,
            children: [
                { key: 's-gpao', label: 'Service gpao', icon: <ToolOutlined /> },
                { key: 's-entretien', label: 'Service Entretien', icon: <BuildOutlined /> },
                { key: 's-secret', label: 'Service secretariat', icon: <SolutionOutlined /> },
                { key: 's-imp', label: 'Service import', icon: <ImportOutlined /> },
                { key: 's-rh', label: 'Service RH', icon: <TeamOutlined /> },
                { key: 's-cpompta', label: 'Service comptable', icon: <AccountBookOutlined /> },
            ],
        },
        {
            key: 'sub2',
            label: 'Paramètres',
            icon: <SettingOutlined />,
            children: [
                {
                    key: 'typo',
                    label: 'Typologie',
                    icon: <AppstoreOutlined />,
                    disabled: true,
                },
                {
                    key: 'pref',
                    label: 'Préférence',
                    icon: <HeartOutlined />,
                    disabled: true,
                },
                {
                    key: 'about',
                    label: 'À propos',
                    icon: <InfoCircleOutlined />,
                },
            ],
        },
    ];
}

// Fonction pour générer les breadcrumbs en utilisant les éléments du menu
export function GetBreadcrumb(keyMenu) {
    const items = GetItemMenu();

    const findBreadcrumbPath = (items, key, path = []) => {
        for (let item of items) {
            if (item.key === key) {
                return [...path, item];
            }
            if (item.children) {
                const childPath = findBreadcrumbPath(item.children, key, [...path, item]);
                if (childPath.length) {
                    return childPath;
                }
            }
        }
        return [];
    };

    const breadcrumbItems = findBreadcrumbPath(items, keyMenu);

    return [
        {
            href: "#",
            title: <div style={{ color:" white" }}>#</div>,
        },
        ...breadcrumbItems.slice(0, -1).map(item => ({
            href: "#",
            title: <span style={{ color: "white" }}>{item.label}</span>,
        })),
        ...(breadcrumbItems.length ? [{
            href: "#",
            title: (
                <>
                    {breadcrumbItems[breadcrumbItems.length - 1].icon && React.cloneElement(breadcrumbItems[breadcrumbItems.length - 1].icon, { style: { color: "white" } })}
                    <span style={{ color: "white" }}>{breadcrumbItems[breadcrumbItems.length - 1].label}</span>
                </>
            ),
        }] : []),
    ];
}
