import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Banner} from "../entity/Banner";
import {Repository} from "typeorm";

@Injectable()
export class BannerService {
    constructor(@InjectRepository(Banner) private readonly bannerRepository: Repository<Banner>) {
    }
}