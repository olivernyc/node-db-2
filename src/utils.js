export function nodeStatus(node) {
	const { status } = node;
	const isActive = status === "Installed";
	return isActive ? "active" : "potential";
}

export const statusColors = {
	active: "rgb(255,59,48)",
	dead: "#aaa",
	hub: "rgb(90,200,250)",
	kiosk: "#01a2eb",
	linkNYC: "#01a2eb",
	"potential-hub": "#777",
	"potential-supernode": "#777",
	potential: "#eee",
	supernode: "#007aff"
};

