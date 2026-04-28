export const formatBytes = (bytes: string | number, decimals = 2) => {
    if (!+bytes) return '0 bytes';

    const [K, DM] = [1024, 0 > decimals ? 0 : decimals];

    const Sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes as number) / Math.log(K));
    
    return `${(Number(bytes) / Math.pow(K, i)).toFixed(DM)} ${Sizes[i]}`
};