export function formatCurrency(amount: number) {
    const currencyFormatter = Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    });
    const price = currencyFormatter.format(amount);
    return price.toString().split(".")[0];
}

export function textTruncate(text: string, length: number) {
    if (text.length > length) {
        return text.slice(0, length) + "...";
    }
    return text;
}
