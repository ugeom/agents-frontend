// Generic utility for injecting dependencies into global scope
export const injectToGlobal = <T extends Record<string, any>>(dependencies: T): T => {
	const globalScope = window as any;
	Object.entries(dependencies).forEach(([key, value]) => {
		globalScope[key] = value;
	});
	return dependencies;
};

// Single function to create and inject dependencies
export const createAndInject = <T extends Record<string, any>>(dependencyMap: T): T => {
	return injectToGlobal(dependencyMap);
};