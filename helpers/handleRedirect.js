// router = useRouter();
// url = /url or /url/[path]
// asUrl = /url/123
export function handleRedirect(router, url, asUrl) {
    if (asUrl) {
        router.push(url, asUrl);
    } else {
        router.push(url);
    }
}