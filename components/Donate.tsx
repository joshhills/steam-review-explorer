const Donate = () => {
    return (<>
        <script type="text/javascript" src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'></script>
        <script type="text/javascript" dangerouslySetInnerHTML={{__html: `
            kofiWidgetOverlay.draw('joshmarcushills', {
                'type': 'floating-chat',
                'floating-chat.donateButton.text': 'Support',
                'floating-chat.donateButton.background-color': '#0d6efd',
                'floating-chat.donateButton.text-color': '#fff'
            });
        `}}>
        </script>
    </>)
}

export default Donate