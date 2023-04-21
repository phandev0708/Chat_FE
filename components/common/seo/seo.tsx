import Head from 'next/head';
export interface SeoPageProps {
    title: string;
    description?: string;
    imagePreview?: string;
    ogTitle?: string;
}

export function SeoPage(props: SeoPageProps) {
    const description = props?.description || 'Oryza ERP - Hệ quản trị doanh nghiệp toàn diện';
    const image = props?.imagePreview || 'oerp.jpg';
    const url = 'https://chat.oerp.vn/';
    const ogTitle = props?.ogTitle || props?.title;

    //
    //

    // const dispatch = useDispatch();

    return (
        <Head>
            <meta name="description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:image:url" content={url} />
            <meta property="og:image:secure_url" content={image} />
            <meta property="og:title" content={ogTitle} />
        </Head>
    );
}
