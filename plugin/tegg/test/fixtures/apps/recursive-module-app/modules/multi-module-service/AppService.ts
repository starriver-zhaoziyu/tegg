import { AccessLevel, ContextProto, Inject } from '@eggjs/tegg';
import AppRepo from '../multi-module-repo/AppRepo';

@ContextProto({
  accessLevel: AccessLevel.PUBLIC,
})
export default class AppService {
  @Inject()
  appRepo: AppRepo;

  findApp(): Promise<Record<string, any>> {
    return this.appRepo.findApp();
  }
}
