import Head from 'next/head'

const HeadMeta = ({metaTitle}) => {
    return ( 
        <Head>
            {/* Basic metas */}
            <meta charSet="utf-8" />
            <meta name="robots" content="noindex, follow" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="description" content="PQEXpress là trang báo cập nhật tin tức mới nhất từ nhiều nguồn uy tín" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <title>{`${metaTitle?metaTitle:"Papr"} || PQEXpress `}</title>
            <link rel="icon" type="image/x-icon" href={`${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASEPATH ?? '' : ''}/favicon.ico`} />
        </Head>
     );
}
 
export default HeadMeta;