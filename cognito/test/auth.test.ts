import { AuthService } from "./AuthService";


async function testAuth() {
  const service = new AuthService;
  const loginResult = await service.login(
    'kelsontx',
    'add-the-password'
  );
  const idToken = await service.getIdToken();
  console.log(idToken);
}

testAuth();