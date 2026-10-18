export function selectCourseServer(servers) {
  return Promise.any(servers.map(server => Promise.resolve().then(server)));
}
