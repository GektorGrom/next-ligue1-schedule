export default function Head({params}) {
    return (
        <>
            <title>Welcome to Ligue 1 schedule</title>
            <meta content="width=device-width, initial-scale=1" name="viewport" />
            <meta name="description" content={`Ligue 1 schedule for ${params.day}`} />
            <link rel="icon" href="/favicon.ico" />
        </>
    )
}
